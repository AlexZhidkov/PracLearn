/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
// firebase functions:config:set gmail.email="EMAIL@GMAIL.COM" gmail.password="PASSWORD"
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'PracLearn';

/**
 * Sends an email for each new document in firestore collection.
 */
exports.sendEmail = functions.firestore
    .document('emails/{emailId}')
    .onCreate((snap, context) => {
        return sendNotificationEmail(snap.data());
    });

/**
 * Sends a welcome email to new user.
 */
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const email = user.email; // The email of the user.
    const displayName = user.displayName; // The display name of the user.

    return sendWelcomeEmail(email, displayName);
});

/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
    const email = user.email;
    const displayName = user.displayName;

    return sendGoodbyeEmail(email, displayName);
});

// Sends a notification email
async function sendNotificationEmail(email) {
    const mailOptions = {
        from: `${APP_NAME}`,
        to: email.to,
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = email.subject;
    mailOptions.text = email.text;
    await mailTransport.sendMail(mailOptions);
    console.log('Notification email sent to:', email.to);
    return null;
}

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
    await mailTransport.sendMail(mailOptions);
    console.log('New welcome email sent to:', email);
    return null;
}

// Sends a goodbye email to the given user.
async function sendGoodbyeEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
    };

    // The user unsubscribed to the newsletter.
    mailOptions.subject = `Bye!`;
    mailOptions.text = `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`;
    await mailTransport.sendMail(mailOptions);
    console.log('Account deletion confirmation email sent to:', email);
    return null;
}
