//
//in .env => MONGO_URI='mongodb://localhost:27017/test'

const Database = require("../app");

describe("Database Tests", () => {
    test("should connect to mongo service", () => {

        expect(() => {
            const db = Database.getInstance();
            db.load(process.env.MONGO_URI);
        }).toThrow(Error);
    });
    
    test("should retrieve message models", () => {
        const db = Database.getInstance();
        db.load(process.env.MONGO_URI);
        db.saveMessage(1, 'user1', "Hello World!");
        const message = db.getMessageByUserId(1);
        expect(message.message).toBe("Hello World!");
        db.close();
    });

    test("should save message models", () => {
        const db = Database.getInstance();
        db.load(process.env.MONGO_URI);
        db.saveMessage(1, 'user1', "Hello World!");
        db.close();

        db.load(process.env.MONGO_URI);
        const message = db.getMessageByUserId(1);
        expect(message.message).toBe("Hello World!");
        db.close();
    });
});

