# Kata Nine
This repository is my attempt at [CodeKata 09](http://codekata.com/kata/kata09-back-to-the-checkout/).

The CodeKata presents a scenario where we have to calculate the total price of an arbitrary collection of items.

```
  Item   Unit      Special
         Price     Price
  --------------------------
    A     50       3 for 130
    B     30       2 for 45
    C     20
    D     15
```

As seen above, there are also *special prices* for some items. In the CodeKata, this is limited to single-item discounts - i.e. `x` of some item results in a `y` discount.

I wanted to tackle the more general case of discounts where the condition is an arbitrary collection of items. (E.g. 2 of A, 3 of B, and 1 of C results in a $30 discount). Furthermore, I aimed to design the classes a way that allows for extension for other conditions and pricing rules with minimal friction.

Please see [technical implementation notes](#technical-implementation-notes) for more on the design!

## Running
First, clone the repo and install the dependencies.
```
npm install
```

```
npm run start
```

## Testing
Testing is implemented with [Jest](https://jestjs.io/). \
To run the test suite, execute the following command:
```
npm run test
```

To run tests while watching for changes, (*"hot-reloading"*), run the following command:
```
npm run test:watch
```

## Technical Implementation Notes

### Note on Item Replacement
During implementation, I came across an interesting case where a user may want to define a discount condition with replacement. That is to say, given discount $\alpha$ (condition: 3x$A$ 1x$B$, discount: $20) and discount $\beta$ (condition: 1x$A$ 2x$B$, discount: $10), a user may want both discounts to be applied when there is only 3 item $A$s and 2 item $B$s in the cart.

During discount optimisation, this introduces a dissonant requirement where discount $\alpha$ must *"consume"* the cart items if the next (and any future) discounts are itself (or others also marked as "no replacement") and not consume anything if the next (and any future) discounts are marked as "with replacement".

In the latest implementation, the intended solution to this problem is to create a third discount $\gamma$ (condition: 3x$A$ 2x$B$, discount: $30). This removes implementational complexity and clears ambiguities for the user as a user **must** explicitly intend to discount using both conditions with replacement.

## Next Steps
- The backtracking solver has a time complexity of $O(R\times N_1\times N_2\times ...N_n)$ where $R$ is the number of pricing rules and $N_{1..n}$ are the cart item counts. This is not ideal, and it would be interesting to implement a solver using an Integer Linear Programming (ILP) formulation. 