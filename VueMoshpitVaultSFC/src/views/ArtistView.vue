<script>
export default {
  name: "ArtistView"
}
</script>

<template>
  <div>
    <!--My Artists and Concert stats Section-->
    <section>
      <div class="container-fluid">
        <!--My Artists and Concert stats-->
        <div class="row align-items-center">
          <div class="col-12 col-md-7">
            <h2>My Artists</h2>

          </div>
        </div>
      </div>
      <!--Artist Search and filter-->
      <div class="row align-items-center pt-4">

        <div class="col-12 col-md-6">
          <label for="artistSearch" class="visually-hidden">Search Artists</label>
          <input
              type="search"
              id="artistSearch"
              class="form-control"
              placeholder="Search Artists">
        </div>
        <div class="col-12 col-md-3 ms-md-auto mt-3 mt-md-0">
          <label for="artistSort" class="visually-hidden">Sort By</label>
          <select id="artistSort" class="form-select">
            <option selected disabled>Sort By</option>
            <option value="artist">Artist</option>
            <option value="date">Date</option>
            <option value="venue">Venue</option>
          </select>
        </div>
      </div>
    </section>
    <!--Artist card-->
    <section>
      <div class="artistCard card mt-3 m-2 mx-4">
        <div class="row gx-0">
          <div class="col-md-4">
            <img src="/img/thestage.jpg" class="artistCardPhoto img-fluid rounded-start"
                 alt="Artist Photo">
          </div>
          <div class="col-md-8 d-flex flex-column justify-content-between px-4">
            <div class="row gx-1">
              <h3 class="pt-2">Avenged Sevenfold</h3>
              <div class="col-auto">
                <button class="btn btn-primary">
                  Songs
                  <span class="badge text-bg-secondary">4</span>
                </button>
              </div>

              <div class="col-auto">
                <button class="btn btn-primary">
                  Venues
                  <span class="badge text-bg-secondary">4</span>
                </button>
              </div>
              <div class="col-auto">
                <a class="btn btn-spotify"
                   target="_blank"
                   href="https://open.spotify.com/artist/0nmQIMXWTXfhgOBdNzhGOs?si=jA_tMWoSSd-xJ6B8aUHpkQ">
                  <i class="bi bi-spotify"></i>
                  Spotify</a>


              </div>
            </div>
            <div class="row">
              <div class="col-12 py-2 justify-content-center">
                <button class="btn btn-primary w-100"
                        data-bs-toggle="collapse"
                        data-bs-target="#totalSongsCollapse"
                        aria-expanded="false"
                        aria-controls="totalSongsCollapse">
                  Expand
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--Artist song and venue stats-->
        <div class="collapse m-4" id="totalSongsCollapse">
          <div class="setlist">
            <h4>Songs</h4>

            <ul class="list-unstyled">
              <li>x10 Nightmare</li>
              <li>x8 Afterlife</li>
              <li>x6 Bat Country</li>
              <li>x5 Nobody</li>
              <li>x3 Save Me</li>
              <li>x2 Unholy Confessions</li>
            </ul>

            <h4>Venues</h4>

            <ul class="list-unstyled">
              <li>x2 Credit Union 1 Amphitheatre</li>
              <li>x1 Resch Center</li>

            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.artistCardPhoto {
  width: 100%;
  height: 260px;
  object-fit: cover;
}
</style>