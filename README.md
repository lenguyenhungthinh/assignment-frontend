This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Coding convention

## Coding Guidelines - ReactJS

### Table of Contents

1. [Basic Rules](###basic-rules)
1. [Naming](###naming)
1. [Importing](###importing)
1. [Styling](###styling)
1. [Declaration](###declaration)
1. [Alignment](###alignment)
1. [Quotes](###quotes)
1. [Props](###props)
1. [Parentheses](###parentheses)
1. [Tags](###tags)
1. [Methods](###methods)
1. [Ordering](###ordering)
1. [Folder](###folder)
1. [Commit Rules](###commit)


### Basic Rules

- Only include one React component per file.
- Always use TSX syntax.
- Do not use `React.createElement` unless you're initializing the app from a file that is not TSX.

### Naming

- File- and component name need to be identical.
- Use PascalCase naming convention for filename as well as component name, e.g. GlobalHeader.tsx

```javascript
// Bad
// Filename: foo.tsx

function Foo() {}
export default Foo;


// Good
// Filename: Foo.tsx

function Foo() {}
export default Foo;
```

### Importing

- Import by order:

1. Next component (next/Image, next/navigate)
1. THIRD_PARTY_MODULES
1. internal module
1. css/scss/sass

### Styling

- Project will use style from .module.scss file.
- Example, Foo.tsx will use Foo.module.scss to styling.

```javascript
// Bad
// Filename: foo.tsx
import classes from './Foo.module.scss';

function Foo() {}
export default Foo;
```

### Ordering

- Ordering for class extends React.Component:

1. constructor
1. optional static methods
1. getChildContext
1. componentWillMount
1. componentDidMount
1. componentWillReceiveProps
1. shouldComponentUpdate
1. componentWillUpdate
1. componentDidUpdate
1. componentWillUnmount
1. _clickHandlers or eventHandlers_ like onClickSubmit() or onChangeDescription()
1. _getter methods for render_ like getSelectReason() or getFooterContent()
1. _Optional render methods_ like renderNavigation() or renderProfilePicture()
1. render

- How to define propTypes, defaultProps, contextTypes, etc...

```javascript
import React, { Component, PropTypes } from 'react';

const propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Hello World',
};

export default class Link extends Component {
  static methodsAreOk() {
    return true;
  }

  render() {
    return (
      <a href={this.props.url} data-id={this.props.id}>
        {this.props.text}
      </a>
    );
  }
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
```

### Alignment

- Follow these alignment styles for TSX syntax

```javascript
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
    <Spazz />
</Foo>
```

### Quotes

- Always use double quotes (`"`) for TSX attributes, but single quotes for all other JS.

```javascript
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

### Props

- Always use camelCase for prop names.

```javascript
// bad
<Foo
    UserName="hello"
    phone_number={12345678}
/>

// good
<Foo
    userName="hello"
    phoneNumber={12345678}
/>
```

### Tags

- Always self-close tags that have no children.

```javascript
// bad
<Foo className="stuff"></Foo>

// good
<Foo className="stuff" />
```

- If your component has multi-line properties, close its tag on a new line.

```javascript
// bad
<Foo
    bar="bar"
    baz="baz" />

// good
<Foo
    bar="bar"
    baz="baz"
/>
```

### Stateless function components

For stateless components use the function syntax, introduced in React 0.14.

```javascript
// Using an ES2015 (ES6) arrow function:
var Aquarium = (props) => {
  var fish = getFish(props.species);
  return <Tank>{fish}</Tank>;
};

// Or with destructuring and an implicit return, simply:
var Aquarium = ({ species }) => <Tank>{getFish(species)}</Tank>;

// Then use: <Aquarium species="rainbowfish" />
```

[Read More](http://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html##stateless-function-components)

### PropTypes declarations

- Setting propTypes declarations is mandatory
- Group them into required/none-required
- Alphabetically sort each group
- Separate them by a new line

```javascript
static propTypes = {
    blank: React.PropTypes.bool.isRequired,
    block: React.PropTypes.bool.isRequired,
    size: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
};
```

### Prefixing none React methods

Prefix all none React methods within a component with an underscore.

```javascript
class Foo extends React.Component {
  componentDidMount() {
    this._update();
  }

  _update() {
    // e.g. update position
  }

  render() {
    return <div>foo</div>;
  }
}
```

### Prefixing component wide variables

In the exception that you do not want to place a component wide variables on the state, you have to prefix it with an underscore.

```javascript
class Foo extends React.Component {
  componentDidMount() {
    this._el = React.FindDOMNode(this.refs.foo);
  }

  render() {
    return <div>foo</div>;
  }
}
```

### Using handler methods

- Name methods using `'_handle' + triggering event`, e.g. `_handleClick`
- Bind handler using the ES6 arrow syntax, so inside the callback it has always the right context

```javascript
class Foo extends React.Component {
  _handleClick = (e) => {
    this.setState({
      clicked: true,
    });
  };

  render() {
    return <button onClick={this._handleClick}>Submit</button>;
  }
}
```

### Using “container” components for loading data from Stores

```javascript
// CommentListContainer.tsx

class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] };
  }
  componentDidMount() {
    $.ajax({
      url: '/my-comments.tsxon',
      dataType: 'json',
      success: function (comments) {
        this.setState({ comments: comments });
      }.bind(this),
    });
  }
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}

// CommentList.tsx

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  _renderComment({ body, author }) {
    return (
      <li>
        {body}—{author}
      </li>
    );
  }
  render() {
    return <ul> {this.props.comments.map(_renderComment)} </ul>;
  }
}
```

Source: https://medium.com/@learnreact/container-components-c0e67432e005

### Closing Components without children

```javascript
render() {
    return (
        <Foo>
            <Bar />
        </Foo>
    );
}
```

### List iterations

When rendering a list of components from an array, do it inline if it makes sense. If the map function is too long or complicated, consider extracting it out into its own method on the component class.

```javascript
render() {
    return (
        <ul>
            {this.state.fooList.map(fooItem => <FooItem>{fooItem}</FooItem>)}
        </ul>
    );
}
```

### Formatting Attributes

```javascript
<input type="text" value={this.state.foo} onChange={this._handleInputChange.bind(this, 'foo')} />
```

### Inline CSS styles

Static properties should be set in the SCSS, dynamic ones in JS.

```css
.Foo {
  background-color: ##ff0;
}
```

```javascript
class Foo extends React.Component {
  render() {
    const styles = {
      transform: 'translateX(' + this.state.position + ' + px)',
    };

    return (
      <div className="Foo" styles={classes}>
        Foo Header
      </div>
    );
  }
}
```

### Use "classnames" to set CSS classes

Use the [classnames](https://www.npmjs.com/package/classnames) node module for setting CSS classes on an element.

```javascript
import classnames from 'classnames';
import React from 'react';

class Foo extends React.Component {
  render() {
    const classes = classnames('FooHeader', {
      'is-fixed': this.state.fixed,
      'is-visible': this.state.visible,
    });

    return <div className={classes}>Foo Header</div>;
  }
}
```

### Working with DOM listeners

http://facebook.github.io/react/tips/dom-event-listeners.html

### Using StaticContainer for more granular control over shouldUpdate

https://github.com/reactjs/react-static-container

### Use higherOrder functions to add scroll/resize listeners

https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750

### Folder

```
common/
  Avatar.tsx
  Avatar.module.scss
  APIUtils.tsx
  APIUtils.test.tsx
feed/
  index.tsx
  Feed.tsx
  Feed.module.scss
  FeedStory.tsx
  FeedStory.test.tsx
  FeedAPI.tsx
profile/
  index.tsx
  Profile.tsx
  ProfileHeader.tsx
  ProfileHeader.module.scss
  ProfileAPI.tsx
```

### Commit

Please follow the commit rules from here:
https://www.npmjs.com/package/@commitlint/config-conventional

### Sources

- https://github.com/kriasoft/react-starter-kit/blob/master/docs/react-style-guide.md
- https://web-design-weekly.com/2015/01/29/opinionated-guide-react-js-best-practices-conventions/
