package de.akquinet.dailyplanner.logic.rest;

public class MobileClientRestIT {

    public static final String PASSWORD = "secret";
    public static final String LOGIN = "user_0";
    public static final String BASE_URL = "http://localhost:8080/curamob/rest/";
    public static final String PING_REQ_URL = BASE_URL + "ping";
    public static final String PING_RESP_URL = BASE_URL + "ping";
    public static final String PAYLOAD = "payload";
    public static final int MAX_NR_RETRIES = 3;
/**
    // TODO: setup IT-infrastructure for automated tests (arquilian?)
    @Test
    public void testPing() throws Exception {
        final String ticket = sendPingRequest();

        receivePingResponse(ticket);

        removeTicket(ticket);
    }

    private void removeTicket(String ticket) throws IOException {
        final URL url = new URL(PING_RESP_URL + "/" + ticket);

        final HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("DELETE");

        connection.setUseCaches(false);
        connection.setDoInput(true);
        connection.setDoOutput(false);

        addAuthenticationToConnection(connection);

        connection.connect();

        final int responseCode = connection.getResponseCode();

        Assert.assertEquals(HttpURLConnection.HTTP_OK, responseCode);
    }

    private void receivePingResponse(String ticket) throws IOException, InterruptedException {
        int i;
        for (i = 0; i < MAX_NR_RETRIES; i++) {
            final JsonNode jsonNode = askForResponse(ticket);
            final JsonNode statusNode = jsonNode.get("state");
            final int state = statusNode.asInt();

            if (state == RequestStatus.OPERATED_STATE) {
                final JsonNode resultNode = jsonNode.get("result");
                System.out.println("resultNode = " + resultNode);
                assertNotNull(resultNode);
                final String result = resultNode.asText();
                assertEquals(PAYLOAD, result);
                break;
            }
            Thread.sleep(1000L);
        }
        if (i == MAX_NR_RETRIES) {
            fail();
        }
    }

    private JsonNode askForResponse(String ticket) throws IOException {
        final URL url = new URL(PING_RESP_URL + "/" + ticket);

        final HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        connection.setUseCaches(false);
        connection.setDoInput(true);
        connection.setDoOutput(false);

        addAuthenticationToConnection(connection);

        final InputStream is = connection.getInputStream();
        final BufferedReader br = new BufferedReader(new InputStreamReader(is));
        final String response = br.readLine();
        System.out.println("response = " + response);

        final ObjectMapper mapper = new ObjectMapper();

        return mapper.readValue(response, JsonNode.class);
    }

    private String sendPingRequest() throws IOException {
        final URL url = new URL(PING_REQ_URL);


        final HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "text/plain; charset=utf-8");

        connection.setUseCaches(false);
        connection.setDoInput(true);
        connection.setDoOutput(true);

        addAuthenticationToConnection(connection);


        final DataOutputStream dos = new DataOutputStream(
                connection.getOutputStream());
        dos.writeUTF(PAYLOAD);
        dos.flush();
        dos.close();

        final InputStream is = connection.getInputStream();
        final BufferedReader br = new BufferedReader(new InputStreamReader(is));
        return br.readLine();
    }

    private void addAuthenticationToConnection(HttpURLConnection connection) {
        final BASE64Encoder enc = new BASE64Encoder();
        final String userpassword = LOGIN + ":" + PASSWORD;
        final String encodedAuthorization = enc.encode(userpassword.getBytes());
        connection.setRequestProperty("Authorization", "Basic " +
                encodedAuthorization);
    }

    **/
}
