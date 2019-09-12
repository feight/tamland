

import * as gql from "type-graphql";


@gql.ObjectType()
export class Team{

    @gql.Field(() => gql.ID)
    public id: string;

    @gql.Field()
    public title: string;

}


@gql.Resolver(Team)
export class TeamResolver{

    @gql.Query(() => Team)
    public team(): Team{

        return {
            id: "x",
            title: "y"
        };

    }

    @gql.Query(() => [Team])
    public teams(): Team[]{

        return [
            {
                id: "x",
                title: "y"
            }
        ];

    }

}
