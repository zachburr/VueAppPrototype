let songCount = 3;

$("#addSong").click(function () {
    songCount++;

    $("#songFields").append(`
        <div class="mb-3">
            <label class="form-label" for="song${songCount}">
                Song ${songCount}
            </label>
            <input
                class="form-control"
                type="text"
                id="song${songCount}">
        </div>
    `);
});
