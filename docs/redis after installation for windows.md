Once you have installed Redis on Windows using the official Redis Windows installer, you can follow these steps to set it up:

### Using the Windows Installer:

1. **Install Redis:**
   - Run the Redis Windows installer and follow the installation instructions.

2. **Start Redis Server:**
   - Once the installation is complete, you can start the Redis server using the Redis Server Manager or from the command line. To start it from the command line, open a Command Prompt and navigate to the Redis installation directory (usually `C:\Program Files\Redis`).
     ```bash
     redis-server.exe
     ```

3. **Verify Redis is Running:**
   - Open another Command Prompt and run the Redis command line interface to check if Redis is running:
     ```bash
     redis-cli
     ```

   - If Redis is running, you should see the Redis command prompt.

4. **Test Connection:**
   - Run a simple test command, such as:
     ```bash
     ping
     ```

   - You should receive a "PONG" response, indicating that Redis is responsive.

5. **Configure Redis (Optional):**
   - The default configuration should work for most development scenarios. However, if you need to make changes, you can modify the Redis configuration file, usually located at `C:\Program Files\Redis\redis.windows.conf`.

6. **Access Redis from Client:**
   - You can now access Redis from your applications by connecting to the server at `localhost` and the default port `6379`.

### Redis Server Manager:

The Redis Windows installer also includes a graphical tool called Redis Server Manager, which provides a user-friendly interface for managing Redis on Windows. You can use this tool to start/stop the server, view logs, and configure settings.

1. **Launch Redis Server Manager:**
   - Look for "Redis Server Manager" in the Start menu or search for it. Open the application.

2. **Manage Redis Server:**
   - Use Redis Server Manager to start and stop the Redis server, view logs, and configure server settings.

3. **Access Redis from Client:**
   - Connect to the Redis server from your applications using the standard Redis client libraries.

Remember that Redis on Windows is typically used for development and testing purposes. If you're deploying Redis in a production environment, it's often recommended to use a Unix-like system, as the Windows version may have certain limitations and is less commonly used in production scenarios.