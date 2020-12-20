var showSubtitle = [true, true];

var currentSubtitle = '';

$(document).ready(function(){
    const video = document.getElementById('video');
    video.onloadeddata = () => {
        const textTrack = video.textTracks[0];
        const cues = textTrack.cues;
        const cueCount = cues.length;
        const duration = video.duration;
        const timeline = $('#timeline');
        const basic = cues[0].startTime;
        const temp_seg = $(`<div style="left: 0%; width: ${100 * basic / duration}%; height: 100%;" class="seg" onclick="seekTo(0)"></div>`);
        timeline.append(temp_seg);
        for (let i = 0; i < cueCount; i ++) {
            const left = 100 * cues[i].startTime / duration;
            const length = i < cueCount - 1 ? (cues[i + 1].startTime - cues[i].startTime) : duration - cues[i].startTime;
            const width = 100 * length / duration;
            const seg = $(`<div style="left: ${left}%; width: ${width}%; height: 100%;" class="seg" onclick="seekTo(${cues[i].startTime})"></div>`);
            timeline.append(seg);
        }    
    };

    for (var i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = 'hidden';
    }
    video.ontimeupdate = () => {
        const duration = video.duration;
        if (video.textTracks[0].activeCues[0]) {
            const displaySubtitle = video.textTracks[0].activeCues[0].text;
             if (displaySubtitle !== currentSubtitle) {
                $('#sub_title1').text(displaySubtitle);
                mandarinspot.annotate('#sub_title1', {phonetic: 'pinyin', show: true, inline: true});
                currentSubtitle = displaySubtitle;
            }
        }
        if (video.textTracks[1].activeCues[0]) {
            $('#sub_title2').text(video.textTracks[1].activeCues[0].text);
        }
        if (video.textTracks[2].activeCues[0]) {
            $('#sub_title3').text(video.textTracks[2].activeCues[0].text);
        }
        const seekPosition = 100 * video.currentTime / duration;
        $("#seek_bar").css('left', `${seekPosition}%`);
    };
});

function seekTo(startTime) {
    const video = document.getElementById('video');
    video.currentTime = startTime;
}

function toggleShow(btnIndex, btn) {
    showSubtitle[btnIndex] = !showSubtitle[btnIndex];
    if (showSubtitle[btnIndex]) {
        $(btn).html('hide');
        $(`#video-controls${btnIndex + 1}`).removeClass('h-20');
        $(`#sub_title${btnIndex + 1}`).removeClass('d-none');
    } else {
        $(btn).html('show');
        $(`#video-controls${btnIndex + 1}`).addClass('h-20');
        $(`#sub_title${btnIndex + 1}`).addClass('d-none');
    }
}

function frameback(){
    const video = document.getElementById('video');
    const textTrack = video.textTracks[0];
    if(textTrack.activeCues.length === 0) {
        alert('This function will be allowed since video is played.')
        return;
    }
    var frame = video.textTracks[0].activeCues[0];
    if(frame.id == 0){
        video.currentTime = 0;
        
    }else{
        //const textTrack = video.textTracks[0];
        const cues = textTrack.cues;
        video.currentTime = cues[frame.id-1].startTime;
        // console.log(video.textTracks[0]);
    }
}

function frameskip(){
    const video = document.getElementById('video');
    const textTrack = video.textTracks[0];
    if(textTrack.activeCues.length === 0) {
        alert('This function will be allowed since video is played.');
        return;
    }
    var frame = textTrack.activeCues[0].id;
    var cues = textTrack.cues;
    if(frame == cues.length-1){
        video.currentTime = cues[frame].startTime;
    }else{
        frame = Number(frame) +1;
        video.currentTime = cues[frame].startTime;
    }
}

function frameloop(){
    const video = document.getElementById('video');
    const textTrack = video.textTracks[0];
    var frame = textTrack.activeCues[0].id;
    var cues = textTrack.cues;    
    video.currentTime = cues[frame].startTime;
}
