var Component = require('../../components/Component');
var FunctionUtil = require('../../utils/FunctionUtil');
var ObjectUtil = require('../../utils/ObjectUtil');

function SearchBar() {
  var onChange;

  return ObjectUtil.assign(Object.create(new Component()), {
    /* Lifecycle methods */
    componentDidMount: function () {
      this.componentDidUpdate.apply(this, arguments);
    },

    componentDidUpdate: function (element) {
      // Clean up element listeners
      element.removeEventListener('input', onChange, false);
    },

    componentDidUpdate: function (element, props) {
      // Default to 100 miliseconds. A good time for responsive behaviour
      var wait = props.wait || 100;
      // Debounce requests on input, so we only request when typing stops
      onChange = FunctionUtil.debounce(props.onChange, 100);
      // Set element listers on input change
      element.addEventListener('input', onChange, false);
    },

    componentWillUnmount: function (element) {
      // Clean up element listeners
      element.removeEventListener('input', onChange, false);
    },

    /* View functions */
    getView: function (props) {
      if (typeof props.onChange !== 'function') {
        throw new Error(
          'SearchBar needs onChange as a function. Type "' +
          typeof props.onChange +
          '" was given.'
        );
      }

      return (
        '<input placeholder="search" autofocus="true" class="search" />'
      );
    }
  });
}

module.exports = SearchBar;
