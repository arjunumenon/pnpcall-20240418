import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { AzureCliCredential, ChainedTokenCredential, DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { executeCommand } from "@pnp/cli-microsoft365";

export async function getSiteTitle(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    // Starting the CLI Part

    const keyVaultUrl = process.env.KeyVaultUrl;
    const certificateName = process.env.CertificateName;
    const tenantId = process.env.TenantId;
    const clientId = process.env.ClientId;

    if (!keyVaultUrl || !certificateName || !tenantId || !clientId) {
        return {
            status: 500,
            body: "Missing environment variables",
        };
    }

    const requestData: any = await request.json();
    const siteUrl = requestData.siteUrl;

    // const siteUrl = "https://aum365.sharepoint.com/sites/PowerAutomateDev";

    const creds: TokenCredential[] = [
        new DefaultAzureCredential(),
        new AzureCliCredential()
    ];
    const credentialChain = new ChainedTokenCredential(...creds);

    const client = new SecretClient(keyVaultUrl, credentialChain);
    const certificate = await client.getSecret(certificateName);

    if (!certificate || !certificate.value) {
        return {
            status: 500,
            body: "Certificate not found",
        };
    }

    const login = await executeCommand("login", {
        interactive: false,
        authType: "certificate",
        tenant: tenantId,
        appId: clientId,
        certificateBase64Encoded: certificate.value,
    });

    if (login.error) {
        return {
            status: 500,
            body: `Error logging in: ${login.error.message}`,
        };
    }

    const site = await executeCommand("spo web get", {
        url: siteUrl,
    });
    const siteInfo = JSON.parse(site.stdout);

    return {
        status: 200,
        jsonBody: siteInfo.Title,
    };

    // End of CLI Part
    // const name = request.query.get('name') || await request.text() || 'world';

    // return { body: `Hello, ${name}!` };
};

app.http('getSiteTitle', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: getSiteTitle
});
