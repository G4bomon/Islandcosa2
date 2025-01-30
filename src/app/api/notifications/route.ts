let clients: { id: number; send: (data: any) => void }[] = [];

export function GET(req: Request) {
  const stream = new ReadableStream({
    start(controller) {
      const clientId = Date.now();
      const send = (data: any) => {
        console.log("Enviando SSE:", data); // 👈 Debug para ver qué se envía
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      clients.push({ id: clientId, send });

      send({ message: "Conectado a SSE" });

      req.signal.addEventListener("abort", () => {
        clients = clients.filter(client => client.id !== clientId);
      });
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title } = body; // Extraer el título del artículo

    console.log("Notificando a clientes SSE:", { title }); // Debug

    // Enviar a todos los clientes conectados
    clients.forEach(client => client.send({ title }));

    return new Response("Notificación enviada", { status: 200 });
  } catch (error) {
    console.error("Error en notificación:", error);
    return new Response("Error en notificación", { status: 500 });
  }
}
