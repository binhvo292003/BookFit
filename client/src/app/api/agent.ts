import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';

const sleep = () => new Promise((reslove) => setTimeout(reslove, 500));

interface ResponseData {
    data: {
        title: string;
        status: number;
        errors: { [key: string]: string[] };
    };
    status: number;
}

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;


const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
    async (response) => {
        await sleep();
        return response;
    },
    (error: AxiosError) => {
        const { data, status } = <ResponseData>error.response;

        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(...data.errors[key]);
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.title);
                break;
            case 401:
                toast.error(data.title);
                break;
            case 404:
                toast.error(data.title);
                break;
            case 500:
                router.navigate('/server-error', { state: { error: data } });
                break;

            default:
                break;
        }

        return Promise.reject(error.response);
    }
);

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
    list: () => requests.get('/product'),
    detail: (id: number) => requests.get(`/product/${id}`),
};

const TestErrors = {
    get401Error: () => requests.get('buggy/unauthorized'),
    get400Error: () => requests.get('buggy/bad-request'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
};

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),

}

const agent = {
    Catalog,
    TestErrors,
    Basket,
};

export default agent;
