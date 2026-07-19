import React from "react";
import { useSearch } from "@/app/SearchContext";
import {
  BadgeCheck,
  Compass,
  ListVideo,
  Play,
  TrendingUp,
} from "lucide-react";

// Shapes of the parts of the raw YouTube SerpApi response that this card renders.
type VideoChannel = {
  name?: string;
  link?: string;
  verified?: boolean;
  thumbnail?: string;
};

type VideoResult = {
  position_on_page?: number | string;
  title: string;
  link: string;
  video_id?: string;
  channel?: VideoChannel;
  published_date?: string;
  views?: number;
  length?: string;
  description?: string;
  extensions?: string[];
  thumbnail?: { static?: string; rich?: string };
};

type PlaylistResult = {
  title: string;
  link: string;
  channel?: VideoChannel;
  videos?: { title: string; length?: string; link: string }[];
  video_count?: number;
  thumbnail?: string;
};

type PeopleAlsoSearchFor = {
  searches?: { query: string; link: string; thumbnail?: string }[];
};

type LongFormVideos = {
  search_information?: {
    total_results?: number;
  };
  video_results?: VideoResult[];
  playlist_results?: PlaylistResult[];
  channels_new_to_you?: VideoResult[];
  people_also_search_for?: PeopleAlsoSearchFor;
};

const formatCount = (count: number) =>
  new Intl.NumberFormat("en", { notation: "compact" }).format(count);

const SectionHeading = ({
  icon: Icon,
  title,
  count,
}: {
  icon: typeof Play;
  title: string;
  count?: number;
}) => (
  <div className="flex items-center gap-1.5">
    <Icon className="size-3.5 text-neutral-400" />
    <h4 className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
      {title}
    </h4>
    {count !== undefined && count > 0 && (
      <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 tabular-nums">
        {count}
      </span>
    )}
  </div>
);

const Thumbnail = ({
  src,
  length,
  className,
}: {
  src?: string;
  length?: string;
  className: string;
}) => (
  <div className={`relative shrink-0 overflow-hidden rounded-lg ${className}`}>
    {src && (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className="h-full w-full object-cover" />
    )}
    {length && (
      <span className="absolute right-1.5 bottom-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white tabular-nums">
        {length}
      </span>
    )}
  </div>
);

const ChannelLine = ({ video }: { video: VideoResult }) => (
  <div className="mt-1 flex min-w-0 items-center gap-1.5">
    {video.channel?.thumbnail && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={video.channel.thumbnail}
        alt=""
        className="size-4 shrink-0 rounded-full"
      />
    )}
    <span className="truncate text-xs text-neutral-500">
      {video.channel?.name}
    </span>
    {video.channel?.verified && (
      <BadgeCheck className="size-3.5 shrink-0 text-neutral-400" />
    )}
    <span className="shrink-0 text-xs text-neutral-400">
      {[
        video.views !== undefined ? `${formatCount(video.views)} views` : null,
        video.published_date,
      ]
        .filter(Boolean)
        .join(" · ")}
    </span>
  </div>
);

const ExtensionBadges = ({ extensions }: { extensions?: string[] }) =>
  extensions && extensions.length > 0 ? (
    <span className="flex gap-1">
      {extensions.map((extension) => (
        <span
          key={extension}
          className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500"
        >
          {extension}
        </span>
      ))}
    </span>
  ) : null;

export default function LongFormVideo() {
  const currentSearch = useSearch((state) => state.currentSearch);

  const data = (
    currentSearch?.result as { longFormVideos?: LongFormVideos } | undefined
  )?.longFormVideos;

  if (!data) return null;

  const videoResults = data.video_results ?? [];
  const playlistResults = data.playlist_results ?? [];
  const newChannelVideos = data.channels_new_to_you ?? [];
  const alsoSearchedFor = data.people_also_search_for?.searches ?? [];
  const totalResults = data.search_information?.total_results;

  return (
    <div className="mt-5 flex flex-col gap-7">
      {totalResults !== undefined && totalResults > 0 && (
        <p className="text-xs text-neutral-400">
          {formatCount(totalResults)} videos on YouTube for this topic
        </p>
      )}

      {/* Top videos — the ranked long-form results */}
      {videoResults.length > 0 && (
        <section>
          <SectionHeading
            icon={Play}
            title="Top videos"
            count={videoResults.length}
          />
          <ul className="mt-2.5 flex flex-col gap-2">
            {videoResults.map((video) => (
              <li key={video.link}>
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-lg border border-neutral-200 p-3 transition-all hover:border-neutral-300 hover:shadow-sm"
                >
                  <Thumbnail
                    src={video.thumbnail?.static}
                    length={video.length}
                    className="h-20 w-36"
                  />
                  <div className="min-w-0">
                    <p className="line-clamp-2 font-medium text-neutral-800 group-hover:underline">
                      {video.title}
                    </p>
                    <ChannelLine video={video} />
                    {video.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                        {video.description}
                      </p>
                    )}
                    <div className="mt-1.5">
                      <ExtensionBadges extensions={video.extensions} />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Playlists ranking for this topic */}
      {playlistResults.length > 0 && (
        <section>
          <SectionHeading
            icon={ListVideo}
            title="Playlists"
            count={playlistResults.length}
          />
          <ul className="mt-2.5 flex flex-col gap-2">
            {playlistResults.map((playlist) => (
              <li
                key={playlist.link}
                className="rounded-lg border border-neutral-200 p-3 transition-all hover:border-neutral-300 hover:shadow-sm"
              >
                <a
                  href={playlist.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3"
                >
                  <Thumbnail
                    src={playlist.thumbnail}
                    length={
                      playlist.video_count !== undefined
                        ? `${playlist.video_count} videos`
                        : undefined
                    }
                    className="h-20 w-36"
                  />
                  <div className="min-w-0">
                    <p className="line-clamp-2 font-medium text-neutral-800 group-hover:underline">
                      {playlist.title}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="truncate text-xs text-neutral-500">
                        {playlist.channel?.name}
                      </span>
                      {playlist.channel?.verified && (
                        <BadgeCheck className="size-3.5 shrink-0 text-neutral-400" />
                      )}
                    </div>
                  </div>
                </a>
                {playlist.videos && playlist.videos.length > 0 && (
                  <ul className="mt-2 flex flex-col gap-1 border-t border-neutral-100 pt-2">
                    {playlist.videos.map((video) => (
                      <li key={video.link}>
                        <a
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-900"
                        >
                          <Play className="size-3 shrink-0 text-neutral-300" />
                          <span className="truncate">{video.title}</span>
                          {video.length && (
                            <span className="ml-auto shrink-0 text-neutral-400 tabular-nums">
                              {video.length}
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Channels new to you — discovery shelf, horizontal scroll */}
      {newChannelVideos.length > 0 && (
        <section>
          <SectionHeading
            icon={Compass}
            title="From channels new to you"
            count={newChannelVideos.length}
          />
          <ul className="mt-2.5 flex gap-3 overflow-x-auto pb-2">
            {newChannelVideos.map((video) => (
              <li key={video.link} className="w-56 shrink-0">
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-lg border border-neutral-200 transition-all hover:border-neutral-300 hover:shadow-sm"
                >
                  <Thumbnail
                    src={video.thumbnail?.static}
                    length={video.length}
                    className="h-28 w-full rounded-none"
                  />
                  <div className="p-2.5">
                    <p className="line-clamp-2 text-sm font-medium text-neutral-800 group-hover:underline">
                      {video.title}
                    </p>
                    <ChannelLine video={video} />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* People also search for — adjacent video topics */}
      {alsoSearchedFor.length > 0 && (
        <section>
          <SectionHeading
            icon={TrendingUp}
            title="People also search for"
            count={alsoSearchedFor.length}
          />
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {alsoSearchedFor.map((item) => (
              <li key={item.query}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-neutral-200 py-1 pr-3 pl-1 text-sm text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  {item.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="size-6 rounded-full object-cover"
                    />
                  )}
                  {item.query}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
