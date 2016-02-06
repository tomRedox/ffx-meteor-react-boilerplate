import {Mongo} from 'meteor/mongo';
import {Astro} from 'meteor/jagi:astronomy';
import {Validators} from 'meteor/jagi:astronomy-validators';

export const SomeItems = new Mongo.Collection('someItems');

Astro.createValidator({
  name: 'myValidator',

  validate(value) {
    return value !== '';
  },

  events: {
    validationError(e) {
      const {fieldName, fieldValue} = e.data;

      if (fieldValue === '') {
        e.setMessage('Name cannot be blank');
      }

      e.stopPropagation();
    }
  }
});

export const SomeItem = Astro.Class({
  name: 'SomeItem',
  collection: SomeItems,
  fields: {
    name: {
      type: 'string',
      validator: Validators.myValidator()
    }
  }
});

// Make stuff accessible in web console and meteor shell
if (process.env.NODE_ENV === 'development') {
  global.SomeItems = SomeItems;
  global.SomeItem = SomeItem;
}