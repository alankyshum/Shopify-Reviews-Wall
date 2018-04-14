#!/bin/bash
if [ $1 = 'direct' ]; then
    echo 'Direct Migration'
    node_modules/.bin/sequelize db:migrate
    exit
fi

PS3="Select Sequelize migrations operations (Enter anything else for help): "
options=("Migrate" "Create Migration" "Check Status" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Migrate")
            node_modules/.bin/sequelize db:migrate
            ;;
        "Create Migration")
            echo "Name of migration: "
            read migration_name
            node_modules/.bin/sequelize migration:generate --name $migration_name
            ;;
        "Check Status")
            node_modules/.bin/sequelize db:migrate:status
            ;;
        "Quit")
            break
            ;;
        *)
          node_modules/.bin/sequelize
          ;;
    esac
done
