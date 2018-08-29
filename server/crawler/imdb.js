import cheerio from 'cheerio'
import rp from 'request-promise'

export const getIMDBCharacters = async()=>{
    const options = {
        uri:'http://www.imdb.com/title/tt0944947/fullcredits?ref_=tt_cl_sm#cast',
        transform:body=>cheerio.load(body)
    }
    const $ = await rp(options)
    var photos = []
    $('table.cast_list tr:nth-of-type(2n)').each(()=>{
        console.log($(this).html())
        //console.log($(this).text())
        // let playedBy = $(this).find('td:nth-of-type:(2)')
        // playedBy = playedBy.text()

        // let nmId = $(this).find('td.itemprop a')
        // nmId = nmId.attr('href')

        // let character = $(this).find('td.character a')

        // let name = character.text()
        // let chId = character.attr('href')

        // const data = {
        //   playedBy,
        //   nmId,
        //   name,
        //   chId
        // }

        // //photos.push(data)
        // if(data.name)console.log(data)
    })
}
getIMDBCharacters()