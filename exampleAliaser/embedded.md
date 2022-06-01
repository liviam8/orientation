## Tricky average *(20%)*


Create a function called `GetTrickyAvg` that takes a number array (only integers) as parameter 
and returns the average of the smallest odd and largest even.

### Example:

#### Input 1

```text
[1, 2, 3]
```  

#### Output 1

```text
1.5
```

#### Input 2

```text
[3, 4, 5, 6]
```  

#### Output 2

```text
4.5
```

#### Input 3

```text
[5, 2, 8, -1]
```  

#### Output 3

```text
3.5
```

## Doggo register *(40%)*

Create a simple dog register, you should store the following data in structure called `dog`:

- the name of the dog, 
- the age of the dog,
- the weight of the dog (in kilograms),
- the size of the dog (as a custome type, see below).

You should store the weight in an enum called `size`, the valid values are:
- small,
- medium, 
- big,
- large.

Store the registered dogs in an array.

Implement a function called `get_oldest` which takes the dog array as a parameter and returns the name of the oldest dog. 

### Example:

#### Input 1

```cpp
example_dog_struct dogs[] = {
    {"ANNA", 2, 4, small},
    {"BELA", 3, 11, medium},
    {"FOXY", 6, 23, big}
};
```  

#### Output 1

```cpp
"FOXY"
```

Implement a function called `get_size_count` which takes the dog array and a valid size and returns the count of dogs which has size qualification.

#### Input 1

We are calling the `get_size_count` function with  `medium` as a valid size.

```cpp
example_dog_struct dogs[] = {
    {"ANNA", 2, 4, small},
    {"BELA", 3, 11, medium},
    {"FOXY", 6, 23, big},
    {"MAX", 1, 7, medium},
    {"DANNY", 11, 33, large}
};
```  

#### Output 1

```cpp
2
```

#### Input 2

We are calling the `get_size_count` function with  `small` as a valid size.

```cpp
example_dog_struct dogs[] = {
    {"ANNA", 2, 4, small},
    {"BELA", 3, 11, medium},
    {"FOXY", 6, 23, big},
    {"MAX", 1, 7, medium},
    {"DANNY", 11, 33, large}
};
```  

#### Output 2

```cpp
1
```

## LED control *(20%)*

There is a button on the devboard, use that button. You should handle the button press event with an interrupt and the LED brightness should be controlled with PWM.
The LED must reach highest brightness in about 2 seconds, and go back to the dark state in about 2 seconds.
To solve this challenge use interrupts and PWM.

## Question *(5%)*

### - Given the following number: 10010011. How do you change the second bit to 1 and the last bit to 0 with bitwise operators without changing the other bits? type your answer here (Give code example in C)
*type your answer here (please explain with your own words)*


### - What's the difference between pseudo random number generation and true random number generation? type your answer here (please explain with your own words)
*type your answer here (please explain with your own words)*

