// Cloudflare Worker 主入口
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

// R2 存储桶绑定
const buckets = {
  y1: R2_BINDING_Y1,
  y2: R2_BINDING_Y2,
  y3: R2_BINDING_Y3,
};

async function handleRequest(request) {
  const url = new URL(request.url);
  const bucketName = url.searchParams.get('bucket');
  const bucket = buckets[bucketName];

  if (!bucket) {
    return new Response('存储桶未找到', { status: 404 });
  }

  const method = request.method;
  const path = url.pathname.slice(1);

  try {
    switch (method) {
      case 'GET':
        return await handleGet(bucket, path);
      case 'PUT':
        return await handlePut(bucket, path, request);
      case 'DELETE':
        return await handleDelete(bucket, path);
      default:
        return new Response('不支持的请求方法', { status: 405 });
    }
  } catch (err) {
    return new Response(`服务器错误: ${err.message}`, { status: 500 });
  }
}

async function handleGet(bucket, path) {
  const object = await bucket.get(path);
  if (!object) {
    return new Response('文件未找到', { status: 404 });
  }
  return new Response(object.body, {
    headers: { 'content-type': object.httpMetadata.contentType || 'application/octet-stream' },
  });
}

async function handlePut(bucket, path, request) {
  const body = await request.arrayBuffer();
  await bucket.put(path, body);
  return new Response('文件已上传', { status: 201 });
}

async function handleDelete(bucket, path) {
  await bucket.delete(path);
  return new Response('文件已删除', { status: 200 });
}
