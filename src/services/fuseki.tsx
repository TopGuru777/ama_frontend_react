import axios from 'axios';

const FusekiService = {
    async executeQuery(query: string): Promise<any> {
        const endpointUrl: string = process.env.REACT_APP_FUSEKI_ENDPOINT as string;
        try {
            const response = await axios.post(endpointUrl, null, {
                params: {
                    query: query
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error executing SPARQL query:', error);
            throw new Error(`Failed to execute SPARQL query: ${error}`);
        }
    }
};

export default FusekiService;