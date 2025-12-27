const orderMapping = {
  "mappings": {
    "properties": {
      "firstName": { "type": "text" },
      "lastName": { "type": "text" },
      "email": { "type": "keyword" },
      "address": { "type": "text" },
      "totalAmount": { "type": "double" },
      "date": { "type": "date" },
      "items": {
        "type": "nested",
        "properties": {
          "id": { "type": "integer" },
          "name": { "type": "text" },
          "price": { "type": "double" },
          "quantity": { "type": "integer" }
        }
      }
    }
  }
}

export default orderMapping;
