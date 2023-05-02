export function basicAuthorizer (event, context, cb) {
    console.log("event: ", JSON.stringify(event, null, 2));
    if (event.type !== "REQUEST") {
        cb("Not authorized at all");
    }

    try {
        const encodedCreds = event.queryStringParameters.token;

        const buff = Buffer.from(encodedCreds, "base64");
        const plainCreds = buff.toString("utf-8").split(":");

        const username = plainCreds[0];
        const password = plainCreds[1];
        const storedUserPassword = process.env[username];
        const effect =
            !storedUserPassword || storedUserPassword != password ? "Deny" : "Allow";
        const policy = generatePolicy(encodedCreds, event.methodArn, effect);

        cb(null, policy);
    } catch (e) {
        cb(`Not authoriazed error: ${e.message}`);
    }
};

const generatePolicy = (principalId, resource, effect = "Allow") => {
    return {
        principalId: principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
    };
};
