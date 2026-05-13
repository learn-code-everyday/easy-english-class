# Ship Command

When asked to ship or deploy:

1. Check code quality
2. Run lint/build
3. Confirm Docker image tag
4. Check GitHub Actions workflow
5. Provide EC2 deploy commands

## Standard deploy command

```bash
cd /opt/apps/bee
sudo docker compose pull
sudo docker compose up -d
sudo docker image prune -f
```
