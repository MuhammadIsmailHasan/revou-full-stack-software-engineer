git init
git branch 
# git checkout -b main  
git log --oneline

git checkout -b feature/project-structure

touch PROJECT.md
echo "sample project" >> PROJECT.md && echo "this is sample project" >> PROJECT.md && echo "the tech stack is python" >> PROJECT.md

git add PROJECT.md
git commit -m "docs: init project documentation"

echo "the feature is simple crud" >> PROJECT.md
git add PROJECT.md
git commit -m "docs: update project documention add feature"

git log --oneline

git checkout main

ls -la

git branch