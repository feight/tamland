
for i in {1..66}
do
    echo "npm deprecate \"@tamland/web@0.0.$i\" \"this version has been deprecated\""
    npm deprecate "@tamland/web@0.0.$i" "this version has been deprecated"
done