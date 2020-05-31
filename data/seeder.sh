#! /bin/bash

mongoimport --host mongodb --db node-boilerplate --collection products --type json --file /data/product.json --jsonArray