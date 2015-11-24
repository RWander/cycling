echo 'Checking outdated packages..'
cd server
echo 'backend'
npm outdated
# tds outdated (see https://github.com/DefinitelyTyped/tsd/issues/247)
echo 'frontend'
cd ../client
npm outdated
# tds outdated (see https://github.com/DefinitelyTyped/tsd/issues/247)
bower-update
echo 'Done.'
