# Setting up git on my server

# server
ssh jono@blogjono.com
cd jono/projects/git
git init --bare s4rb
# local
git remote add deploy ssh://jono@blogjono.com:/home/jono/jono/projects/git/s4rb
git push deploy master

# server
git clone /home/jono/jono/projects/git/s4rb /home/jono/jono/projects/dynamic/s4rb
cd /home/jono/jono/projects/dynamic/s4rb
pnpm install
pnpm run build
forever start app

# setup routeing
vim /home/jono/jono/projcets/routerjon.conf.json
