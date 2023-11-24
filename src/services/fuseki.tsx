import axios from 'axios';
import nlp from 'compromise';

const FusekiService = {
    /*
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
        },
    
        // Function to generate SPARQL query from natural language input
        generateSPARQLQuery(naturalLanguage: string): string {
            const doc = nlp(naturalLanguage);
    
            // Extract relevant information from the parsed data
            const entities = doc.nouns().out('array');
            const relations = doc.match('#Verb').out('array');
            const conditions = doc.match('#Adjective').out('array');
    
            // Generate the SPARQL query based on the extracted information
            const sparqlQuery = `
                SELECT ?${entities.join(' ?')} WHERE {
                ?${entities.join(' ?')} ${relations.join(' ; ')} .
                FILTER (${conditions.join(' && ')})
                }
            `;
    
            return sparqlQuery;
        },
    */
    async getSPARQLResponse(message: string): Promise<any> {
        const sparqlUrl: string = process.env.REACT_APP_BACKED_SPARQL as string;
        const params = new URLSearchParams();
        params.append('message', message);
        try {
            const response = await axios.post(sparqlUrl, params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error executing SPARQL query:', error);
            // throw new Error(`Failed to execute SPARQL query: ${error}`);
            return { error: error }
        }
    }
};

export default FusekiService;