'use strict';

describe('truths', function () {

    it('should be true', inject(function () {
        expect(4).toEqual(2 + 2);
    }));

    xit('should be skipped', inject(function () {
        expect(4).toBeGreaterThan(5);
    }))

});