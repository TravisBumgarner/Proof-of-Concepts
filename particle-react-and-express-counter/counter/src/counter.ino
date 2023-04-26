SYSTEM_THREAD(ENABLED);      // Code Runs even with no connection
SerialLogHandler logHandler; // This allows for USB serial debug logs

int count();

const char *eventName = "counterEvent";
std::chrono::milliseconds publishPeriod = 30s; // Can use `min` and `h` as well.

unsigned long lastPublishMs;

void setup()
{
}

void loop()
{
    if (millis() - lastPublishMs >= publishPeriod.count())
    {
        lastPublishMs = millis();

        String eventData = String::format("%d", count());

        if (Particle.connected())
        {
            Particle.publish(eventName, eventData);
            Log.info("published %s", eventData.c_str());
        }
        else
        {
            Log.info("not cloud connected %s", eventData.c_str());
        }
    }
}

int counter = 0;
int count()
{
    return counter++;
}