# C19 Stats Serverless Functions

### Prerequisites
Ensure node & npm are installed

Install yarn

```
npm install -g yarn
```

To run functions locally you will need to install the [Azure Function Core Tools](https://www.npmjs.com/package/azure-functions-core-tools)

#### To install dependencies
```
yarn install
```

#### To test
```
yarn test
```

#### To run functions locally
```
yarn start
```

Functions will be available on http://localhost:7071/api

### Functions
#### Stats

Returns Coronavirus statistics for the fiven country
* **URL**

    `/stats/:country`
* **Method:**

  `GET`
  
*  **URL Params**

   **Optional:**
 
   `country=[string]`
   
   defaults to `global`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        NewConfirmed: 264767,
        TotalConfirmed: 25746235,
        NewDeaths: 6478,
        TotalDeaths: 856969,
        NewRecovered: 254670,
        TotalRecovered: 17071445 
    }
    ```

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `"No data found for country"`

#### Stats

Returns an alphabetized list of countries which can be used to query for statistics
* **URL**

    `/countries`
* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [ 
        {
            Country: "Cuba",
            Slug: "cuba",
            ISO2: "CU"
        },
        {
            Country: "Turkey",
            Slug: "turkey",
            ISO2: "TR"
        },
        ...
    ]
    ```