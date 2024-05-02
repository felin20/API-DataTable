import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import ProductListingPage from './components/ProductListingPage';
import ProductModal from './components/ProductModal';

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Router>
        <Switch>
          <Route exact path="/" component={ProductListingPage} />
          {/* Add more routes if necessary */}
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;


// import React from 'react';
// import enTranslations from '@shopify/polaris/locales/en.json';
// import { Switch } from 'react-router-dom';

// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import ProductListingPage from './components/ProductListingPage';
// import ProductModal from './components/ProductModal'; // Make sure the path is correct
// import { AppProvider } from '@shopify/polaris';

// function App() {
//   return (
//     <AppProvider i18n={enTranslations}>
//     <Router>
//       <Switch>
//         <Route exact path="/" component={ProductListingPage} />
//         {/* Add more routes if necessary */}
//       </Switch>
//     </Router>
//     </AppProvider>
//   );
// }

// export default App;


// import React from 'react';
// import { AppProvider } from '@shopify/polaris';
// import enTranslations from '@shopify/polaris/locales/en.json'; // Import English translations
// import ProductListingPage from './components/ProductListingPage'; // Import your main component

// import './styles.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import ProductModal from './components/ProductModal';
// function App() {
//   return (
//     <AppProvider i18n={enTranslations}>
      
//     <div className='Table'>
        
//         <ProductListingPage />
        
//         </div>
      
//     </AppProvider>
//   );
// }

// export default App;

// function App() {
//   return (
//  <AppProvider i18n={enTranslations}>
//     <Router>
//       <Switch>
//         <Route exact path="/" component={ProductListingPage} />
//       </Switch>
//     </Router>
//      </AppProvider>
//   );
// }

// export default App;
