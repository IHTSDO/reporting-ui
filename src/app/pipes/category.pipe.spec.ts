import { CategoryPipe } from './category.pipe';

const input = [
    {
        name: "Term contains X"
    },
    {
        name: "Semantic Tag Hierarchy"
    },
    {
        name: "Concepts with Parents"
    }
];

describe('CategoryPipe', () => {
    it('create an instance', () => {
        const pipe = new CategoryPipe();
        expect(pipe).toBeTruthy();
    });

    // it('allow those with name or jobName parameter', () => {
    //     const pipe = new CategoryPipe();
    //
    //     let output = [
    //         {
    //             name: "Term contains X"
    //         }
    //     ];
    //
    //     expect(pipe.transform(input, 'Term')).toEqual(output);
    // });

    // it('do not allow those without name or jobName parameter', () => {
    //     const pipe = new CategoryPipe();
    //
    //     let output = [];
    //
    //     expect(pipe.transform(input, 'Term')).toEqual(output);
    // });
});
