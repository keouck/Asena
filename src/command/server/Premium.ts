import { Message, MessageEmbed } from 'discord.js'
import Command from '../Command'
import SuperClient from '../../SuperClient'
import Server from '../../structures/Server'
import { dateTimeToString } from '../../utils/DateTimeHelper'
import { PremiumType } from '../../models/Premium'

export default class Premium extends Command{

    constructor(){
        super({
            name: 'premium',
            aliases: ['pre', 'p'],
            description: 'commands.server.premium.description',
            usage: null,
            permission: undefined,
            examples: []
        })
    }

    async run(client: SuperClient, server: Server, message: Message, args: string[]): Promise<boolean>{
        let description: string
        if(server.isPremium()){
            description = server.translate('commands.server.premium.info', ...[
                server.translate(`global.premium.${server.premium.humanizeType()}`),
                dateTimeToString(server.premium.startAt, server.locale),
                server.premium.type === PremiumType.PERMANENT ? `${server.translate('global.unlimited')} ♾️` : dateTimeToString(server.premium.finishAt, server.locale)
            ])
        }else{
            description = server.translate('commands.server.premium.try')
        }

        const embed: MessageEmbed = new MessageEmbed()
            .setAuthor(`${SuperClient.NAME} Premium`, SuperClient.AVATAR)
            .setColor('LUMINOUS_VIVID_PINK')
            .setFooter(message.guild.name, message.guild.iconURL())
            .setDescription(description)

        await message.channel.send({ embed })
        return true
    }

}
