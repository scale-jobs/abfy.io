# Introduction to ABfy: A Mental Model for A/B Testing

## Introduction:
This document aims at creating a mental model of what the Library Aims at creating and How 
The main problem that is being solved by this library is A/B testing surveillance, i.e the ability to be able to render different varieties of a particular component and to be aware of which particular variety was rendered. Now, just answering what was rendered and when gives us only half of the picture, but doesn't answer the question related to main goal. Goal is the experiment because of which this setup was made.

## The Problem:
To explain the above point even more clearly:
Consider an Food Delivery App's "Surprise Me" Button
Now, as a company, you would want your users to try your new feature "Surprise Me" which you believe would increase the number of orders placed in your app thereby increasing the revenue. But this is all your hypothesis and you would want this hypothesis to be tested.

How would you test it?
Your teammate Alice suggested that you can have a section titled "Don't know what to Order?"
which then explains your new feature and places the button "Surprise Me" at the end of it.
Another teammate BoB suggests that you can instead have the section say "Let us surprise you!"

Now, both look like good options for you, and you are not able to choose which one to go ahead with

## The Solution

This is where A/B tests shine! 
You can create an ```Experiment``` titled "Test_Surprise_Order" . 
This experiment of yours has two variants in it. 
```Variant #1``` : "Don't know what to Order?" 
```Variant #2```:  "Let us surprise you!"

The KeyAction for this experiment is clicking the button ```Surprise Me``` 

As a user of this library, you should be able to know which variant made the users click the button more, there by ending the debate to what should be the title of the section.


## The Implementation

Initialize the ABfyProvider at the root of your application by providing the backendUrl, where the library can post the experiment results (//TODO: Add a separate section about the post data structure) 

```  
    <ABfyProvider backendUrl="<your-backend-url>">
        <app/>
    </ABfyProvider>

```


As described above, you would first create an Experiment, in order to do so, you can use ABfy's ```Experiment``` component


``` 
<Experiment id="Test_Surprise_Order">
</Experiment> 
``` 

Now, you would want to include all possible variants of this experiments and wrap each variant under the ```<Variant>```  component, this would communicate to the parent ```<Experiment>``` component that at any given scenario only one of the variant should be rendered. 

```
<Experiment id="Test_Surprise_Order">
    <Variant id="1"> 
        <>
           <SurpriseOrder title="Don't know what to Order?" />
        </>
    </Variant>
     <Variant id="2"> 
        <>
           <SurpriseOrder title="Let us surprise you!" />
        </>
    </Variant>
</Experiment>
``` 

You can place your ```KeyAction``` wherever you feel would be the optimal place for you to fetch the results of your experiment, this can be a button click, a page load, a area being in focus, a form submitted, basically anything that's valuable for you!

However, for our example, it would make sense for us to have the <KeyAction> inside the <SurpriseOrder> component


``` 
export function SurpriseOrder({title}){ 
    return ( 
    <>
        <h1>{title}</h1>
        <KeyAction>
            <Button>Order Now</Button>
        </KeyAction>   
    </> 
        
    )
} 
```

Now, for every key action that is taken by any user, ABfy pushes the results of your experiments for you to take calculated decisions