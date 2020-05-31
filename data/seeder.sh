#! /bin/bash

mongoimport --host mongodb --db icommerce --collection products --type json --file /data/product.json --jsonArray