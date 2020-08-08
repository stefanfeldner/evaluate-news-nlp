import "babel-polyfill";
import { handleSubmit } from '../client/js/formHandler';

describe('Testing if function exists' , () => {
    test('Should return true', async () => {
        expect(typeof handleSubmit).toBe('function');
        expect(handleSubmit).toBeTruthy();
        expect(handleSubmit).toBeDefined();
    });
});