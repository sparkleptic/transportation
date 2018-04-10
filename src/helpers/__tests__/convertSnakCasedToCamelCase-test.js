// @flow

import convertSnakeCasedToCamelCase from '../convertSnakeCasedToCamelCase';

describe('convertSnakeCasedToCamelCase', () => {
  it('should convert each key of the one level snake_cased object to camelCase without changing the non-object value of each key', () => {
    let object = {
      login_status: true,
      user_hash_message: 'hashMessage',
    };

    let result = convertSnakeCasedToCamelCase(object);
    expect(result).toEqual({
      loginStatus: true,
      userHashMessage: 'hashMessage',
    });
  });

  it('should convert array of snake_cased object to camel case', () => {
    let object = {
      completed_transactions: [
        {
          id: '123',
          items_purchased: '10 Anroid cable charger',
          total_price: 5000,
        },
        {id: '234', items_purchased: 'Spoon and Fork', total_price: 10000},
      ],
    };

    let result = convertSnakeCasedToCamelCase(object);
    expect(result).toEqual({
      completedTransactions: [
        {
          id: '123',
          itemsPurchased: '10 Anroid cable charger',
          totalPrice: 5000,
        },
        {id: '234', itemsPurchased: 'Spoon and Fork', totalPrice: 10000},
      ],
    });
  });

  it('should convert snake_cased oject no matter how deep the object is', () => {
    let object = {
      item_1: {
        item_description: 'item one is good',
        other_detail: {
          price_per_box: 3000,
        },
      },
      item_2: {
        item_description: 'item two is better',
        other_detail: {
          price_per_box: 3000,
          recipient: {
            recipient_name: 'Hans',
            recipient_address: {
              post_code: '12341',
              address: 'Somewhere',
            },
          },
        },
      },
    };
    let result = convertSnakeCasedToCamelCase(object);
    expect(result).toEqual({
      item1: {
        itemDescription: 'item one is good',
        otherDetail: {
          pricePerBox: 3000,
        },
      },
      item2: {
        itemDescription: 'item two is better',
        otherDetail: {
          pricePerBox: 3000,
          recipient: {
            recipientName: 'Hans',
            recipientAddress: {
              postCode: '12341',
              address: 'Somewhere',
            },
          },
        },
      },
    });
  });

  it('should not convert word id to upper case if it is not the first word, but do convertion to ID if it is found in remaining splitted word', () => {
    let object = {
      id: '123',
      user: {
        user_id: 'user1',
        user_id_transaction: '312',
      },
    };

    let result = convertSnakeCasedToCamelCase(object);
    expect(result).toEqual({
      id: '123',
      user: {
        userID: 'user1',
        userIDTransaction: '312',
      },
    });
  });
});
