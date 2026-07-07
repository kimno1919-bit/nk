-- 1. 'media'라는 이름의 퍼블릭 스토리지 버킷 생성
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- 2. 모든 사람이 미디어를 조회(볼 수) 있도록 허용
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'media' );

-- 3. 관리자(로그인한 사용자)만 미디어를 업로드할 수 있도록 허용
create policy "Auth Insert"
  on storage.objects for insert
  with check ( bucket_id = 'media' and auth.role() = 'authenticated' );

-- 4. 관리자(로그인한 사용자)만 미디어를 수정할 수 있도록 허용
create policy "Auth Update"
  on storage.objects for update
  using ( bucket_id = 'media' and auth.role() = 'authenticated' );

-- 5. 관리자(로그인한 사용자)만 미디어를 삭제할 수 있도록 허용
create policy "Auth Delete"
  on storage.objects for delete
  using ( bucket_id = 'media' and auth.role() = 'authenticated' );
