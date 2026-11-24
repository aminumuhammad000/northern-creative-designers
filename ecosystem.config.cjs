module.exports = {
  apps: [
    {
      name: "northc",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3002",
      cwd: "/var/www/northc",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "450M",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
      },
    },
  ],
};
