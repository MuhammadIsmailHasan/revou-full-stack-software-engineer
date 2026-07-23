touch SAME-README.md

git checkout -b dev-one
echo "this is from dev-one" > SAME-README.md
git add SAME-README.md
git commit -m "docs: write on the 1st line"

git checkout -b dev-two
echo "this is from dev-two" > SAME-README.md
git add SAME-README.md
git commit -m "docs: write on the 1st line from 2"


