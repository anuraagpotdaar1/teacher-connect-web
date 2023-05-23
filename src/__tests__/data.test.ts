import firebase from 'firebase-mock';

const mockFirestore = new firebase.MockFirestore();

mockFirestore.autoFlush();

jest.mock('firebase/app', () => ({
    firestore: jest.fn(() => mockFirestore),
}));

const fetchData = async (id: string) => {
    const snapshot = await mockFirestore.collection('data').doc(id).get();
    return snapshot.data();
};

const uploadData = async (data: any) => {
    const docRef = mockFirestore.collection('data').doc();
    await docRef.set(data);
    return true;
};

describe('fetchData', () => {
    it('should fetch data correctly', async () => {
        const mockData = { id: '123', name: 'John Doe' };
        mockFirestore.collection('data').doc('123').set(mockData);

        const result = await fetchData('123');

        expect(result).toEqual(mockData);
    });
});

describe('uploadData', () => {
    it('should upload data correctly', async () => {
        const dataToUpload = {id: '123', name: 'John Doe' };

        const result = await uploadData(dataToUpload);

        expect(result).toBe(true);

        const uploadedData = await mockFirestore.collection('data').get(); 
        expect(uploadedData.size).toBe(2); 
        expect(uploadedData.docs[0].data()).toEqual(dataToUpload);
    });
});