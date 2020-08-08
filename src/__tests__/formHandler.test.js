const handleSubmit = '../client/js/formHandler';
import "babel-polyfill";

describe('Testing if function exists' , () => {
    test('Should return true', async () => {
        expect(typeof handleSubmit).toBe('function');
    });
});