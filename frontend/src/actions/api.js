import axios from 'axios';

const baseUrl = "https://localhost:5001/api/";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    product(url = baseUrl + 'Product/') {

        return {
            fetchAll: () => axios.get(url),
            create: newProduct => axios.post(url, newProduct),
            update: (id, updateProduct) => axios.put(url + id, updateProduct),
            delete: id => axios.delete(url + id),
            fetchById: id => axios.get(url + id)
        }
    }
};
