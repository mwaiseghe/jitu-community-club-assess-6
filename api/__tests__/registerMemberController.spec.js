const mssql = require('mssql');
const { registerMember } = require('../Controllers/registerMemberController');

const req = {
    body: {
        first_name: "Gift",
        last_name: "Mwaiseghe",
        email: "gift.mwaiseghe@thejitu.com",
        phone_number: "0712345678",
        gender:"male",
        cohort_number: "17",
        description: "I am good in helping out with complex logic"
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe('registerMemberController', () => {
    describe('registerMember', () => {
        it('should return a 400 status code if any of the required fields is missing', async () => {
            const req = {
                body: {
                    first_name: "Gift",
                    last_name: "Mwaiseghe",
                    email: "",
                    phone_number: "0712345678",
                    gender: "",
                    cohort_number: "17",
                    description: "I am good in helping out with complex logic"
                }
            }

            await registerMember(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Please fill in all fields"
            })
        })
        

        it('should return a 400 status code if the email is not in the format', async () => {
            const req = {
                body: {
                    first_name: "Gift",
                    last_name: "Mwaiseghe",
                    email: "gift@gmail.com",
                    phone_number: "0712345678",
                    gender:"male",
                    cohort_number: "17",
                    description: "I am good in helping out with complex logic"
                }
            }

            await registerMember(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Email must be in the format: fname.lname@thejitu.com"
            })
        })

        it('should return a 400 status code if the email already exists', async () => {
            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [{}]
                })
            })

            await registerMember(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Email already exists"
            })
        })


        it('should return a 200 status code if the member is registered successfully', async () => {
            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            });

            await registerMember(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Member registered successfully"
            })
        })

        it('should return a 500 status code if there is an error', async () => {
            jest.spyOn(mssql, 'connect').mockRejectedValueOnce(new Error('Something went wrong'));

            await registerMember(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Something went wrong"
            })
        })
    })
})

