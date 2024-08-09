import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import UserSendRecoverPasswordMailService from '../../../src/services/user/user-send-recover-password-mail-service.js';
import nodemailer from 'nodemailer';

describe('Tests for User Send Recover Password Mail Service', () => {
    beforeAll(() => {
        nodemailer.createTransport = jest.fn(() => { return {
            sendMail: jest.fn().mockResolvedValue({ messageId: '123' })
        }})
    });

    beforeEach(() => {
        nodemailer.createTransport.mockClear();
    });

    test('Should use Nodemailer Transporter', async () => {
        await UserSendRecoverPasswordMailService.send('token', 'user');
        expect(nodemailer.createTransport).toBeCalled();
    });

    test('Should throw error if transporter failed', async () => {
        nodemailer.createTransport = jest.fn(() => { return {
            sendMail: jest.fn().mockImplementation(() => {
                const err = new Error("Error sending mail");
                throw err;
            })
        }})
        try {
            await UserSendRecoverPasswordMailService.send('token', 'user');
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Failed sending the recover password email");
        }
    });
});