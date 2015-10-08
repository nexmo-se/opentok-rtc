var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Grid', function() {

  var instance;

  function getContainer() {
    return document.querySelector('ul');
  }

  function addItems(instance, number) {
    for (var i = 0; i < number; i++) {
      instance.append('myItem' + i);
    }
  }

  function checkSizes(width, height) {
    var features = instance.features();
    expect(features.width).to.equal((width - instance._HORIZONTAL_PADDING) + '%');
    expect(features.height).to.equal((height - instance._VERTICAL_PADDING) + '%');
  }

  before(function() {
    window.document.body.innerHTML = window.__html__['test/unit/layout_spec.html'];
  });

  beforeEach(function() {
    document.getElementById('myContainer').innerHTML = '';
    instance = new Grid('div');
  });

  describe('#constructor', function() {
    it('should be initialized properly', function() {
      var container = getContainer();
      expect(instance.container).to.be.container;
      expect(instance.itemType).to.equal('li');
      expect(container.parentNode.classList.contains('tc-list')).to.be.true;
      expect(container.parentNode.classList.contains('grid')).to.be.true;
    });
  });

  describe('#append', function() {
    it('should add items', function() {
      var container = getContainer();
      expect(container.children.length).to.equal(0);
      addItems(instance, 1);
      var item = container.querySelector('li');
      expect(item.dataset.id).to.equal('myItem0');
      expect(container.children.length).to.equal(1);
    });

    it('should fit one item to the whole container', function() {
      addItems(instance, 1);
      checkSizes(100, 100);
    });

    it('should fit two items to the half of the container width', function() {
      addItems(instance, 2);
      checkSizes(50, 100);
    });

    it('should fit three/four items to the half container height and width',
      function() {
      addItems(instance, 3);
      checkSizes(50, 50);

      addItems(instance, 1);
      checkSizes(50, 50);
    });
  });

  describe('#remove', function() {
    it('should delete items', function() {
      var container = getContainer();
      addItems(instance, 1);
      expect(container.children.length).to.equal(1);
      instance.remove('myItem0');
      expect(container.children.length).to.equal(0);
    });
  });

  describe('#features', function() {
    it('should be called to set sizes', function() {
      addItems(instance, 1);
      var item = getContainer().querySelector('li');
      var features = instance.features();
      expect(features.width).to.equal(item.style.width.replace(',', '.'));
      expect(features.height).to.equal(item.style.height.replace(',', '.'));
    });
  });

  describe('#rearrange', sinon.test(function() {
    it('should be called after addding or removing items', function() {
      sinon.spy(instance, 'rearrange');
      addItems(instance, 1);
      expect(instance.rearrange.calledOnce).to.be.true;
      instance.remove('myItem0');
      expect(instance.rearrange.calledTwice).to.be.true;
    });
  }));

});
