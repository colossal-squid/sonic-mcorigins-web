import { Howl } from 'howler';

const BASE_PATH = 'arvolleyball/';

function howl(path) {
    return new Howl({
        src: [`${BASE_PATH}/${path}`]
    });
}
export const sounds = {
    hit: howl('hit.ogg'),
    gameOver: howl('game_over.ogg'),
    gameStart: howl('game_start.ogg'),
    miss: howl('miss.ogg'),
    score: howl('score.ogg'),
};