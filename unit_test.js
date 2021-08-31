var expect = chai.expect

describe('Test Function', function() {
    describe('Randomize Deck', function() {
        it('should randomize a given array.', function() {
            var x = randomizeDeckTest([1,3,4,5,8,12]);
            expect(x).not.have.ordered.members([1,3,4,5,8,12]);
            
        
        });

        

    });
})