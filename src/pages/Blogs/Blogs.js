import React from 'react';

const Blogs = () => {
    return (
        <div className='container mx-auto px-5 py-10'>
            <h1 className='text-2xl border-b pb-3 text-center pl-3 font-semibold'>Blogs</h1>
            <div className='mt-5'>
                <div className='w-full lg:w-9/12 lg:mx-auto'>
                    <div className='mb-3 shadow-lg p-3 rounded-md border border-gray-200'>
                        <h2 className='font-semibold text-xl'> What are the different ways to manage a state in a React application?</h2>
                        <article className='pl-2 mt-1'>
                            Different ways to handle state in React applications. In React apps, there are at least four ways to handle the state.
                            <ul className='list-inside list-decimal'>
                                <li>Local State</li>
                                <li>Global State</li>
                                <li>Server State</li>
                                <li>URL State</li>
                            </ul>
                        </article>
                    </div>
                    <div className='mb-3 shadow-lg p-3 rounded-md border border-gray-200'>
                        <h2 className='font-semibold text-xl'>How does prototypical inheritance work?</h2>
                        <p className='pl-2 mt-1'>
                            Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                        </p>
                    </div>
                    <div className='mb-3 shadow-lg p-3 rounded-md border border-gray-200'>
                        <h2 className='font-semibold text-xl'>What is a unit test? Why should we write unit tests?</h2>
                        <p className='pl-2 mt-1'>
                            The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                        </p>
                    </div>
                    <div className='mb-3 shadow-lg p-3 rounded-md border border-gray-200'>
                        <h2 className='font-semibold text-xl'>React vs. Angular vs. Vue?</h2>
                        <article className='pl-2 mt-1'>
                            There are three js frameworks for building web applications. React is a UI library, Angular is a fully-fledged front-end framework, and Vue.js is a progressive framework. Each framework is component-based and allows the rapid creation of UI features.
                            <p className='pl-2 mb-1'><strong>#React </strong>React can be used as a UI library to render elements, without enforcing a specific project structure, and that’s why it’s not strictly a framework.</p>
                            <p className='pl-2 mb-1'><strong>#Angular </strong>AngularJS, the original framework, is an MVC (Model-View-Controller)) framework.Projects in Angular are structured into Modules, Components, and Services.Each Angular application has at least one root component and one root module.</p>
                            <p className='pl-2 mb-1'><strong>#Vue </strong>The Vue.js core library focuses on the View layer only. It’s called a progressive framework because you can extend its functionality with official and third-party packages, such as Vue Router or Vuex, to turn it into an actual framework.</p>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;
