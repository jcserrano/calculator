(function () {
  'use strict';

  describe('Calculator', function() {
    it('can add positive integers', function() {
      expect(calc(3, 1, '+')).toEqual(4);  
    });
    it("can subtract positive integers", function() {
      expect(calc(8, 5, '-')).toEqual(3);
    });
    it("can multiply positive integers", function() {
      expect(calc(4, 3, '*')).toEqual(12);
    });
    it("can divide positive integers", function() {
      expect(calc(12, 4, '/')).toEqual(3);
    });
  });
})();
